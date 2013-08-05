class HomePageController < ApplicationController
  skip_before_filter :authenticate_user!
  def index
    if user_signed_in?
      if current_user.super_admin?
        redirect_to :controller => "companies", :action => "companies_listing"
      else
        redirect_to :controller => "reports", :action => "dashboard"
      end
    end
  end

end
