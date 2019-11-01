class RegistrationsController < ApplicationController

  skip_before_action :authenticate
  def create
    user = User.create!(
      email: params['user']['email'],
      password: params['user']['password'],
      password_confirmation: params['user']['password_confirmation']
    )
    if user
      profile = Profile.create!(user_id: user.id)
      jwt = Auth.issue({user: user.public_user_id})
      render json: {
        status: "created",
        jwt: jwt
      }
    else
      render json: { status: 500 }
    end
  end

end
