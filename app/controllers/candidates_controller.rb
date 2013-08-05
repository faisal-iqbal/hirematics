class CandidatesController < ApplicationController
  require 'mail'
  require 'icalendar'


  skip_before_filter :authenticate_user!, :only => [:apply, :create]
  #-------------------- All Crud controls -------------------------#

  def index
    conditions = {}
    if params[:job]
      conditions[:job_id] = params[:job]
    end

    if params[:status]
      conditions[:candidate_status_id] = params[:status]
    end

    if params[:name]
      conditions = "first_name LIKE ? OR last_name LIKE ?", "%#{params[:name]}%", "%#{params[:name]}%"
    end

    if params[:keyword]
      conditions = "tags LIKE ?", "%#{params[:keyword]}%"
    end
    
    if params[:new_resume]
      conditions[:new_resume] = params[:new_resume]
    end
    # .paginate works exactly similar to .find
    @candidates = Candidate.paginate(:conditions =>conditions, :order => "id DESC", :page => params[:page], :per_page => 10)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @candidates }
    end
  end
  def show
    @candidate = Candidate.find(params[:id])
    mark_as_read(@candidate)
    respond_to do |format|
      format.html { render :edit }# show.html.erb
      format.json { render :json => @candidate }
    end
  end
  def create

    @candidate = Candidate.new(params[:candidate])
    @candidate.candidate_status_id = 1 unless user_signed_in?

    respond_to do |format|
      if @candidate.save
        if @candidate.notify == true
          UserMailer.send_mail(@candidate).deliver
        end
        if user_signed_in?
          Evaluation.create(:content => params[:evaluation], :candidate_id => @candidate.id)
          ActivityLog.create(:log => "Created with status: #{@candidate.status},
                               Assign to: #{User.find_by_id(@candidate.assigned_to).try(:name)},
                               referral: #{User.find_by_id(@candidate.referral).try(:name)}",
            :user_id => current_user.id,
            :candidate_id => @candidate.id )
          format.html { redirect_to candidates_url, :notice => 'Candidate was successfully created.' }
          format.json { render :json => @candidate, :status => :created, :location => @candidate }
        else
          format.html { redirect_to apply_url, :notice => 'Thanks, Your application is submitted sucessfully.' }
          format.json { render :json => @candidate, :status => :created, :location => job_board_url }
        end
      else

        if user_signed_in?
          if @candidate.errors[:email] == ["has already been taken"]
            format.html { redirect_to :action => :show,
              :id => Candidate.find(:first, :conditions => [ "email = ?",
                  @candidate[:email]]).try(:id).to_s,
              :notice => "Candidate already registered" }
          else
            if @candidate.errors[:phone] == ["has already been taken"]
              format.html { redirect_to :action => :show, :id => Candidate.find(:first, :conditions => [ "email = ?", @candidate[:phone]]).try(:id).to_s, :notice => "Candidate already registered" }
            else
              notices = "All the fields are mandatory"
            end
          end
          format.html { render :action => :new, :notice => notices }
        else
          if @candidate.errors[:email] == ["has already been taken"]
            notices = "Email is already regsitered"
          else
            if @candidate.errors[:phone] == ["has already been taken"]
              notices = "Phone number is already regsitered"
            else
              notices = "All the fields are mandatory"
            end
          end
          format.html { render :apply, :notice => notices }
        end
        format.json { render :json => @candidate.errors, :status => :unprocessable_entity }
      end
    end
  end
  def new
    @candidate = Candidate.new
    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @candidate }
    end
  end
  def update
    @candidate = Candidate.find(params[:id])

    respond_to do |format|
      if @candidate.update_attributes(params[:candidate])
        ActivityLog.create(:log => "Details updated status: #{@candidate.status},
                             Assign to: #{User.find_by_id(@candidate.assigned_to).try(:name)},
                             referral: #{User.find_by_id(@candidate.referral).try(:name)}",
          :user_id => current_user.id,
          :candidate_id => @candidate.id )
        if @candidate.notify == true
          UserMailer.send_mail(@candidate).deliver
        end
        format.html { redirect_to candidates_url,
          :notice => 'Candidate was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @candidate.errors, :status => :unprocessable_entity }
      end
    end
  end
  def delete_confirmation_popup
    @candidate = Candidate.find(params[:id])
    render :layout=>false
  end
  def destroy
    @candidate = Candidate.find(params[:id])
    @candidate.destroy
    respond_to do |format|
      format.html { redirect_to candidates_url }
      format.json { head :ok }
    end
  end
  def apply
    @candidate = Candidate.new
    @candidate.job_id = params[:job_id] if params[:job_id] and Job.exists?(params[:job_id])
  end
  def edit
    @candidate = Candidate.find(params[:id])
  end

  #-------------------- All Crud controls End -------------------------#

  #-------------------- All Evaluation controls End -------------------------#

  def create_evaluation
    @evaluation = Evaluation.new(params[:evaluation])
    if @evaluation.save
      ActivityLog.create(:log => "Evaluation added",
        :user_id => current_user.id,
        :candidate_id => @evaluation.candidate_id )
      if params[:popup]
        render :text => @evaluation.id
      else
        redirect_to candidate_path(@evaluation.candidate_id)
      end
    else
      if params[:popup]
        render :text => "no"
      else
        render :action => "add_evaluation"
      end
    end
  end
  def add_evaluation
    @evaluation = Evaluation.new(:candidate_id => params[:id])
  end
  def edit_evaluation
    @evaluation = Evaluation.find(params[:evaluation][:id])
    @evaluation.score = params[:evaluation][:score]
    @evaluation.content = params[:evaluation][:content]
    if @evaluation.save
      ActivityLog.create(:log => "Evaluation updated",
        :user_id => current_user.id,
        :candidate_id => @evaluation.candidate_id )
      if params[:popup]
        render :text => @evaluation.id
      else
        redirect_to candidate_path(@evaluation.candidate_id)
      end
    else
      if params[:popup]
        render :text => "no"
      else
        render :action => "edit_evaluation"
      end
    end
  end
  def edit_evaluation_popup
    @evaluation = Evaluation.find(params[:id])
    render :layout=>false
  end
  def add_evaluation_popup
    @interview_id = params[:id]
    render :layout=>false
  end
  def add_simple_evaluation_popup
    @candidate_id = params[:id]
    render :layout=>false
  end
  def evaluation_listing
    @candidate = Candidate.find(params[:id], :include => :evaluations)
    render :layout=>false
  end
  
  #-------------------- All Evaluation controls End -------------------------#

  #-------------------- All Interviews controls -------------------------#
  
  def interview_listing
    @candidate = Candidate.find(params[:id], :include => :interviews)
    render :layout=>false
  end
  def create_interview
    @interview = Interview.new(params[:interview])
    if @interview.save
      if @interview.notify
        change_status(@interview)
        ActivityLog.create(:log => "Evaluation Scheduled. Email Sent for #{@interview.interview_type}",
          :user_id => current_user.id,
          :candidate_id => @interview.candidate_id )
      else
        ActivityLog.create(:log => "Evaluation Scheduled without notification",
          :user_id => current_user.id,
          :candidate_id => @interview.candidate_id )
      end
      if params[:popup]
        render :text => @interview.id
      else
        redirect_to candidate_path(@interview.candidate_id)
      end
    else
      if params[:popup]
        render :text => "no"
      else
        render :action => "add_interview"
      end
    end
    if @interview.notify
      UserMailer.send_interview_mail(@interview).deliver
      UserMailer.make_ical(@interview).deliver
      change_status(@interview)
    end
  end
  def delete_interview
    logger.debug "========================================== #{params[:id]} should be deleted ===================================================================="
    @interview = Interview.find(params[:id])
    candidate = @interview.candidate_id
    @interview.destroy
    respond_to do |format|
      format.html { redirect_to candidate_path(candidate) }
      format.json { head :ok }
    end
  end
  def delete_interview_confirmation_popup
    @interview = Interview.find(params[:id])
    render :layout=>false
  end
  def add_interview
    @interview = Interview.new(:candidate_id => params[:id])
  end
  def add_interview_popup
    @interview = Interview.new(params[:interview])
    @candidate_id = params[:id]
    render :layout=> false
  end
  def edit_interview
    @interview = Interview.find(params[:interview][:id])
    @interview.user_id = params[:interview][:user_id]
    @interview.user_id_1 = params[:interview][:user_id_1]
    @interview.interview_date = params[:interview][:interview_date]
    @interview.location_id = params[:interview][:location_id]
    @interview.interview_type = params[:interview][:interview_type]
    @interview.notify = params[:interview][:notify]
    if @interview.save
      if @interview.notify
        UserMailer.send_interview_mail(@interview).deliver
        UserMailer.make_ical(@interview, '[Rescheduled]').deliver
      end
      ActivityLog.create(:log => "Schedule updated",
        :user_id => current_user.id,
        :candidate_id => @interview.candidate_id )
      if params[:popup]
        render :text => @interview.id
      else
        redirect_to candidate_path(@interview.candidate_id)
      end
    else
      if params[:popup]
        render :text => "no"
      else
        render :action => "edit_interview"
      end
      
    end
  end
  def edit_interview_popup
    @interview = Interview.find(params[:id])
    @candidate_id = @interview.candidate_id
    render :layout=>false
  end
 

  #-------------------- All Interviews controls End -------------------------#

  #-------------------- All Misc. controls -------------------------#

  def export
    conditions = {}
    if params[:job]
      conditions[:job_id] = params[:job]
    end
    if params[:status]
      conditions[:candidate_status_id] = params[:status]
    end

    csv = "Name,Applied for,Applied on,Status,Notified,Source,Tags\n";
    Candidate.all(:conditions=>conditions).each do |candidate|
      csv += candidate.to_csv+"\n"
    end

    send_data( csv, :filename => "candidates.csv", :type => 'text/csv' )
  end
  def mark_as_read(candy)
    @_candidate = candy
    @_candidate.new_resume = false
    @_candidate.save
    logger.debug "=========================== =========================================Candidate saved with o #{@_candidate.inspect}=========================================="
  end
  #-------------------- All Misc. controls end -------------------------#
  private
  def change_status(interv)
    @interv = interv
    @cand = Candidate.find(@interv.candidate_id)
    @cand.candidate_status_id = CandidateStatus.find(:first, :conditions=>{:name => @interv.interview_type}).try(:id)
    @cand.notify = true
    @cand.save
  end
end
#   logger.debug "=========================== params for candidate #{params[:candidate].inspect}"