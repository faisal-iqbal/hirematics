class JobsController < ApplicationController
  skip_before_filter :authenticate_user!, :only => [:job_board]
  # GET /jobs
  # GET /jobs.json
  def index
    conditions = {}
    if params[:status]
      conditions[:status] = params[:status]
     
    end
    if params[:department_id]
      conditions[:department_id] = params[:department_id]
     
    end
    if params[:location_id]
      conditions[:location_id] = params[:location_id]
      
    end
    if params[:keyword]
      conditions[:title] = params[:keyword]
    end
    #    conditions[:company_id] = session[:current_company_id]
    @jobs = Job.all(:conditions=>conditions)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @jobs }
    end
  end

  # GET /jobs/1
  # GET /jobs/1.json
  def show
    @job = Job.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @job }
    end
  end
  
  def job_board
    @jobs = Job.all(:conditions=>{:status => 1})
  end

  # GET /jobs/new
  # GET /jobs/new.json
  def new
    @job = Job.new
    @job.status = 1
    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @job }
    end
  end

  def new_department
    render :layout=>false
  end

  def create_department
    department = Department.new(params[:department])
    if department.save
      render :text => "#{department.id}:::#{department.name}"
    else
      render :text => "no"
    end
  end

  def new_location
    render :layout=>false
  end

  def create_location
    location = Location.new(params[:location])
    location.strip_whitespace
    if location.save
      render :text => "#{location.id}::::#{location.name}"
    else
      render :text => "no"
    end
  end

  # GET /jobs/1/edit
  def edit
    @job = Job.find(params[:id])
  end

  # POST /jobs
  # POST /jobs.json
  def create
    @job = Job.new(params[:job])

    respond_to do |format|
      if @job.save
        format.html { redirect_to jobs_url, :notice => 'Job was successfully created.' }
        format.json { render :json => @job, :status => :created, :location => @job }
      else
        format.html { render :action => "new" }
        format.json { render :json => @job.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /jobs/1
  # PUT /jobs/1.json
  def update
    @job = Job.find(params[:id])

    respond_to do |format|
      if @job.update_attributes(params[:job])
        format.html { redirect_to jobs_url, :notice => 'Job was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @job.errors, :status => :unprocessable_entity }
      end
    end
  end

  def update_status
    @current_open_job_count = Job.all.count(:conditions => {:status=> 1})
    @package_id = Company.find(current_user.company_id).try(:package)
    @allowed_open_jobs = Package.find(@package_id).try(:allowed_open_jobs)
    if (@current_open_job_count == @allowed_open_jobs)
      render :text=>"no"
    else
      @job = Job.find(params[:id])
      if @job.update_attribute(:status, params[:status])
        render :text=>"ok"
      else
        render :text=>"no"
      end
    end
  end

  def delete_confirmation_popup
    @job = Job.find(params[:id])
    render :layout=>false
  end

  # DELETE /jobs/1
  # DELETE /jobs/1.json
  def destroy
    @job = Job.find(params[:id])
    @job.destroy

    respond_to do |format|
      format.html { redirect_to jobs_url }
      format.json { head :ok }
    end
  end

  def facebook_status_popup
    @job = Job.find(params[:id])
    render :layout=>false
  end
  def twitter_status_popup
    @job = Job.find(params[:id])
    render :layout=>false
  end
  def linkedin_status_popup
    @job = Job.find(params[:id])
    render :layout=>false
  end
end
