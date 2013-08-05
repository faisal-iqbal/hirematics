class EvaluationNamesController < ApplicationController
  before_filter :allow_admin!
  active_scaffold :evaluation_name do |conf|
  end
   private
  def allow_admin!
    unless current_user.admin?
      redirect_to root_path, :notice => "Login as Administrator to manage evaluation name settings"
    end
  end
end 