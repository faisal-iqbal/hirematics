class Sender < ActiveRecord::Base
   if current_user.present? and current_user.company_id.present?
    default_scope where(:company_id => current_user.company_id)
  else
    default_scope where(:company_id => $current_company_id)
  end
  validates     :password,      :presence => true
  validates     :username,      :presence => true, :format => { :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i}
  validates     :port,          :presence => true, :numericality => true
  validates     :domain,        :presence => true
  validates     :address,       :presence => true

end
