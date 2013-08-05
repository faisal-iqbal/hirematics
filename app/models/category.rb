class Category < ActiveRecord::Base
  if current_user.company_id?
    default_scope where(:company_id => current_user.company_id)
  else
    default_scope where(:company_id => $current_company_id)
  end
  validates :name, :presence => true
end
