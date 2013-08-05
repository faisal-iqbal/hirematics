class Interview < ActiveRecord::Base
   if current_user.company_id?
    default_scope where(:company_id => current_user.company_id)
  else
    default_scope where(:company_id => $current_company_id)
  end

  belongs_to  :candidate
  belongs_to  :user

  validates   :interview_date, :presence => true
  validates   :candidate_id, :presence =>true
  validates   :location_id, :presence => true
  validates   :interview_type, :presence =>true
end
