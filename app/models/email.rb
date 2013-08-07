class Email < ActiveRecord::Base
   if current_user.present? and current_user.company_id.present?
    default_scope where(:company_id => current_user.company_id)
  else
    default_scope where(:company_id => $current_company_id)
  end
  validates :do_action, :presence => true, :uniqueness => true
  validates :body, :presence => true
  validates :subject, :presence => true
end
