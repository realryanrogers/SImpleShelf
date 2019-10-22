class RegistrationsController < ApplicationController

  def create
    user = User.create!(
      email: params['user']['email'],
      password: params['user']['password'],
      password_confirmation: params['user']['password_confirmation']
    )
    if user
      render json: {
        status: :created,
        user: user.public_user_id
      }
    else
      render json: { status: 500 }
    end
  end

end
