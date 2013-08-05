class ApplicationController < ActionController::Base
  before_filter :authenticate_user!
 
  protect_from_forgery

  module SetVariableForCompany
    $current_company_id
  end
  private
  def clear_variables!
    $current_company_id = nil
  end
end
