class UsersController < ApplicationController
  before_action :find_user, only:[:edit, :update,:edit_password]
  before_action :authenticate_user!, except: [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user =User.new(user_params)
    if(@user.save)
      session[:user_id] = @user.id
      redirect_to root_path notice: "Thank you for signing up"
    else
      render :new
    end

  end



  def edit
    puts @user.id
    puts current_user
    unless @user.id == current_user.id
      flash[:alert] = "Access denied"
      redirect_to root_path
    end
  end

  def edit_password
    unless @user.id == current_user.id
      flash[:alert] = "Access denied"
      redirect_to root_path
    end
  end

  def update_password
    @user = User.find(params[:id])
    if(password_params[:new_password] == password_params[:current_password])
      flash.now[:alert] = "You must choose a new password"
      render :edit_password


    elsif(password_params[:new_password] == password_params[:confirm_password] && @user.authenticate(password_params[:current_password]))
      @user.update(password: password_params[:new_password])
      redirect_to root_path, notice: "Password successfully updated"
    else
      flash.now[:alert] = "Either your password is incorrect, or your new passwords do not match."
      render :edit_password
    end
  end

  def update
    if @user.update(user_params)
      redirect_to root_path
    else
      render :edit, alert: "Something went wrong"
    end
  end

private

def user_params
  params.require(:user).permit(:first_name,:last_name, :email, :password, :password_confirmation)
end

def password_params
  params.require(:user).permit(:current_password, :new_password, :confirm_password)
end

def find_user
  @user = User.find(params[:id])
end





end
