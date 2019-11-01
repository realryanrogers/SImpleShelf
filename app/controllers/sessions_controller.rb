class SessionsController < ApplicationController

  skip_before_action :authenticate

  def create
    user = User.find_by(email: auth_params[:email])
    if user.authenticate(auth_params[:password])
      jwt = Auth.issue({user: user.public_user_id})
      render json: {jwt: jwt, status: "Logged In"}
    else
      render json: {status: 401}
    end
  end


  private
    def auth_params
      params.require(:user).permit(:email, :password)
    end
end
