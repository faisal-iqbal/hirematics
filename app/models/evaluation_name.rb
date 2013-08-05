class EvaluationName < ActiveRecord::Base
   if current_user.company_id?
    default_scope where(:company_id => current_user.company_id)
  else
    default_scope where(:company_id => $current_company_id)
  end
  validates :name, :presence => true


   def self.options_for_select
    opt = []
    EvaluationName.all.each{|e| opt << [[e.name, e.id]]}
    opt << ["--------------------", ""]
  end
end
