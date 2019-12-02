class UsersController < ApplicationController
  def show
    @user = User.find_by(public_user_id: params["public_user_id"])
    render json: {status: "success", user: {id: @user.public_user_id, email: @user.email, firstName: @user.firstname, lastName: @user.lastname}}


  end

  def edit
    @user = current_user
    if !@user.present?
      render json: {status: "error"}
    end
    user = @user.update(params)
    if user
      render json: {status: "success"}
    else
      render json: {status: "error"}
    end
  end

end
