class Department < ActiveRecord::Base
   if current_user.present? and current_user.company_id.present?
    default_scope where(:company_id => current_user.company_id)
  else
    default_scope where(:company_id => $current_company_id)
  end
  validates :name, :presence => true

  def self.options_for_select
    opt = []
    Department.all.each{|l| opt << [l.name, l.id]}
    opt << ["---------------------", ""]
    opt << ["Add New Department", "add_new"]
  end
end