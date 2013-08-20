class ReportsController < ApplicationController

  before_filter :create_company_session_id
  require 'date'
  def index
    @status = CandidateStatus.all
    @chart = {}
    data = []
    @status.each{|s| data << "['#{s.name}', #{Candidate.count(:conditions=>{:candidate_status_id => s.id})}]"}
    @chart[:data] = "[#{data.join(',')}]"
    @chart[:title] = "Candidates in Hiring Pipeline"
    @google_chart_api_js = true
  end

  def dashboard
    @status = CandidateStatus.all
    @chart = {}
    data = []
    @status.each{|s| data << "['#{s.name}', #{Candidate.count(:conditions=>{:candidate_status_id => s.id})}]"}
    @chart[:data] = "[#{data.join(',')}]"
    @chart[:title] = "Candidates in Hiring Pipeline"
    @google_chart_api_js = true
  end

  def status_pipeline
    @report_heading = "Status Pipeline"
    @report_description = "This report gives you a summary of the number of candidates in various stages of your hiring pipeline."
    all_candidate_count = Candidate.count
    @report_data = CandidateStatus.all.map do |cs|
      row = {'Status' => cs.name}
      candidate_count = cs.candidate_count(params[:job_id], params[:start_date], params[:end_date])
      row['Candidates'] = candidate_count
      row['Percentage'] = ((candidate_count/all_candidate_count)*100).to_s + "%"
      row
    end
  end

  def job_stats
    #conditions = {}
    conditions = ""

    conditions += "candidate_id = #{params[:status]}"  unless params[:status].blank?
    conditions += "department_id = #{params[:department_id]}"  unless params[:department_id].blank?
    conditions += "date(created_at) > '#{params[:start_date].to_date}'" if params[:end_date].blank? and !params[:start_date].blank?
    conditions += "date(created_at) < '#{params[:end_date].to_date}'"  if !params[:end_date].blank? and params[:start_date].blank?
    conditions += "date(created_at) between '#{params[:start_date].to_date}' and '#{params[:end_date].to_date}'" if !params[:end_date].blank? and !params[:start_date].blank?
    #conditions[:created_at] = " > '#{params[:start_date].to_date}'" if params[:end_date].blank? and !params[:start_date].blank?
    #conditions[:candidate_id]         = params[:status] unless params[:status].blank?
    #conditions[:department_id]  = params[:department_id] unless params[:department_id].blank?
    
    
	  #conditions[:created_at]	= " < '#{params[:end_date].to_datetime}'"   if !params[:end_date].blank? and params[:start_date].blank?
	  #conditions[:created_at]	= " between '#{params[:start_date].to_datetime}' and '#{params[:end_date].to_datetime}'" if !params[:end_date].blank? and !params[:start_date].blank?
    @report_heading = "Job Stats"
    #    @report_description = "#{conditions.inspect}"
    @report_description = "This report gives you a summary of the number of candidates in various jobs."
    @report_data = Job.all(:conditions=>conditions).map do|j|
      {
        'Job' => j.title,
        'Department' => j.department.name,
        'New Candidates' => j.new_candidates_count,
        'Old Candidates' => j.old_candidates_count,
        'Created at' => j.created_at.strftime("%d %b %Y")
        
      }
    end
  end

  def time_in_process
    conditions = ""
    conditions += "job_id = #{params[:job_id]}" unless params[:job_id].blank?
    conditions += "candidate_status_id = '#{params[:status]}'" unless params[:status].blank?
    #    conditions += "created_at > '#{params[:start_date]}'" if params[:end_date].blank? and !params[:start_date].blank?
    #	  conditions += "created_at < '#{params[:end_date]}'"   if !params[:end_date].blank? and params[:start_date].blank?
    #	  conditions += "created_at between '#{params[:start_date]}' and '#{params[:end_date]}'" if !params[:end_date].blank? and !params[:start_date].blank?
    conditions += "date(created_at) > '#{params[:start_date].to_date}'" if params[:end_date].blank? and !params[:start_date].blank?
    conditions += "date(created_at) < '#{params[:end_date].to_date}'"  if !params[:end_date].blank? and params[:start_date].blank?
    conditions += "date(created_at) between '#{params[:start_date].to_date}' and '#{params[:end_date].to_date}'" if !params[:end_date].blank? and !params[:start_date].blank?
    @report_heading = "Time in Process"
    @report_description = "This report gives you a summary of the time since candidates is first added."
    @report_data = Candidate.all(:conditions=>conditions).map do|c|
      {
        'Candidate' => c.name,
        'Job' => c.job.title,
        'Status' => c.status,
        'Created at' => c.created_at.strftime("%d %b %Y"),
        'Total Days' => (Time.now.to_date - c.created_at.to_date).to_i
      }
    end
  end
  def employee_referral
    @report_heading = "Employee Referral"
    @report_description = "This report gives you a summary of the number of candidates referred by an employee."
    @report_data = Candidate.select("Count(id) as total_candidate, referral as referee").group("referral")
    #      row = {'Employee' => User.find(cd.referee).try(:name)}
    #      row['Candidates'] = cd.total_candidate
  end

  def reload
    render :layout=>false
  end

  private
  def create_company_session_id
    if current_user.company_id.present?
#      session[:current_company_id] = current_user.company_id
    end
  end
end