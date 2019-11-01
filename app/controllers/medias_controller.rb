class MediasController < ApplicationController

  def index
    @user = User.find_by(public_user_id: params[:user_public_user_id])
    render json: {media: @user.medias}
  end

  def create
    @user = User.find_by(public_user_id: params[:user_public_user_id])
    #check to make sure the same thing doesn't exist

    @media = Media.create!(
      name: params["media"]["name"],
      media_id: params["media"]["media_id"],
      media_id_type: params["media"]["media_id_type"],
      property_type: params["media"]["property_type"]
    )
  end


  private
    def media_params
      params.require(:user_public_user_id)
    end
end
