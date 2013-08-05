class MembersController < ApplicationController

  def index
    @users = User.find_all_by_company_id(session[:current_company_id])
  end

  def new
    @user =  User.new
    @action = 'create'
  end

  def edit
    @user =  User.find(params[:id])
    @action = 'update'
    render :action => "new"
  end

  def create
    if params[:user]
      @user = User.new(params[:user])
      if @user.save
        flash[:notice] = 'User was successfully created.'
        redirect_to "/members"
      else
        render :action => "new"
      end
    else
      redirect_to "/members"
    end
  end

  def update
    if params[:user]
      @user =  User.find(params[:user][:id])
      if params[:user][:password].blank? and params[:user][:password_confirmation].blank?
        params[:user].delete(:password)
        params[:user].delete(:password_confirmation)
      end
      if @user.update_attributes(params[:user])
        flash[:notice] = 'User was successfully updated.'
        redirect_to "/members"
      else
        @action = 'update'
        render :action => "new"
      end
    else
      redirect_to users_path
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      flash[:notice] = 'User was successfully deleted.'
    else
      flash[:error] = @user.errors
    end
    redirect_to "/members"
  end

  private
  def allow_admin!
    unless current_user.admin?
      redirect_to root_path, :notice => "Login as Administrator to manage users"
    end
  end
end