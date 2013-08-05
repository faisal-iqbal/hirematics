class Designation < ActiveRecord::Base
   if current_user.company_id?
    default_scope where(:company_id => current_user.company_id)
  else
    default_scope where(:company_id => $current_company_id)
  end
  validates :title, :presence => true

  def self.options_for_select
    Designation.all.map{|l|[l.title, l.id]}
  end
end
