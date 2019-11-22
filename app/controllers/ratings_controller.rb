class RatingsController < ApplicationController

    def index
        puts "PARAMS"
        puts params
        @user = current_user
        @ratings = @user.ratings
        render json: @ratings.to_json
    end

    def create
        #expected params: public_user_id, media_type, type_id, review, details
        #
        @user = current_user
        #take the param[isbn], and call an API to get title, cover image, author       
        response = Rating.handleRating(@user, params)
        render json: response.to_json
    end

end