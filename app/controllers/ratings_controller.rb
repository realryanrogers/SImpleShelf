class RatingsController < ApplicationController

    def index
        puts "PARAMS"
        puts params
        @user = User.find_by(public_user_id: params["public_user_id"])
        @ratings = @user.ratings
        render json: @ratings.to_json
    end

    def create
        #expected params: public_user_id, media_type, type_id, review
        #
        @user = User.find_by(public_user_id: params["public_user_id"])        
        response = Rating.handleRating(@user, params)
        render json: response.to_json

end