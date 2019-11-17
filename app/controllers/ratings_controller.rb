class RatingsController < ApplicationController

    def index
        puts "PARAMS"
        puts params
        @user = User.find_by(public_user_id: params["public_user_id"])
        @ratings = @user.ratings
        render json: @ratings.to_json
    end

end