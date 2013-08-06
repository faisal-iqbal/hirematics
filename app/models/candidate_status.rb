class CandidateStatus < ActiveRecord::Base
  if current_user.company_id.present?
    default_scope where(:company_id => current_user.company_id)
  else
    default_scope where(:company_id => $current_company_id)
  end

  def candidate_count(job_id = '', start_date = '', end_date = '')
    conditions				= {:candidate_status_id => self.id}
	  conditions[:job_id]		= job_id if !job_id.blank?
	  conditions[:created_at]	= " > '#{start_date}'" if end_date.blank? and !start_date.blank?
	  conditions[:created_at]	= " < '#{end_date}'"   if !end_date.blank? and start_date.blank?
	  conditions[:created_at]	= " between '#{start_date}' and '#{end_date}'" if !end_date.blank? and !start_date.blank?
	  
    Candidate.count(:conditions => conditions)
  end
end