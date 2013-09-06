class CompaniesController < ApplicationController
  require 'securerandom'
  before_filter :allow_super_admin!
  skip_before_filter :authenticate_user!, :only => [:create_company_popup, :create]
  skip_before_filter :allow_super_admin!, :only => [:create_company_popup, :create]
  
  active_scaffold :company do |conf|
  end

  def create_company_popup
    @package_id = params[:id]
    @company = Company.new
    render :layout => false
  end

  def create
    @user = User.new(params[:user])
    @user.admin = true
    @company = Company.new(params[:company])
    if @company.save
      pass = SecureRandom.hex
      #      o =  [('a'..'z'),('A'..'Z')].map{|i| i.to_a}.flatten
      #      pass  =  (0...10).map{ o[rand(o.length)] }.join
      
      @user.company_id = @company.id
      @user.password = pass
      if @user.save
        #        customer = Stripe::Customer.create(:description => @company.email, :plan => @company.package, :card => params[:token][:token])
        #        @company.stripe_customer_toke = customer.id
        if @company.save
          UserMailer.new_company(@user, pass).deliver
          render :text => 'yes'
        else
          render :text => 'no'
        end
      else
        render :text => 'no'
      end
    else
      render :text => 'no'
    end
  end
 

  def companies_listing
    @company = Company.find(:all)
    respond_to do |format|
      format.html
      format.json { render :json => @company }
    end
  end
  include SetVariableForCompany
  def set_company_id
    $current_company_id = params[:id]
    redirect_to :controller => "reports", :action => "dashboard"
  end
  private
  def allow_super_admin!
    unless current_user.super_admin?
      redirect_to root_path, :notice => "You are not authorized to visit company settings"
    end
  end
end