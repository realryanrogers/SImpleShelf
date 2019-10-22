class MediasController < ApplicationController

  def index
    puts params[:user_public_user_id]

    @user = User.find_by(public_user_id: params[:user_public_user_id])
    puts @user
    render json: {media: @user.medias}

  end


  private
    def media_params
      params.require(:user_public_user_id)
    end
end
