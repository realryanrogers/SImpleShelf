class UsersController < ApplicationController
  def show
    @user = User.find_by(public_user_id: params["public_user_id"])
    render json: {status: "success", user: {id: @user.public_user_id, email: @user.email}}


  end

end
