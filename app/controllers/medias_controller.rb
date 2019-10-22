class MediasController < ApplicationController

  def index
    @user = User.find_by(public_user_id: params[:user_public_user_id])
    render json: {media: @user.medias}
  end


  private
    def media_params
      params.require(:user_public_user_id)
    end
end
