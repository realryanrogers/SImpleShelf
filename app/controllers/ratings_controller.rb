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
        puts "Auth Passed to create"
        @user = current_user
        params[:user] = @user
        params[:user_id] = @user.id
        #take the param[isbn], and call an API to get title, cover image, author       
        response = Rating.handleRating(@user, rating_params)
        render json: response.to_json
    end

    def bookDetails
        puts "Details"
        #send back: Total ratings, text of reviews (cap at 10), review from user, total positive ratings
        
        ratings = Rating.getDetails(params["book_id"], current_user.id)
        puts ratings
        render json: ratings.to_json
    end

    private

    def rating_params
        params.permit(:media_type, :google_id, :value, :review)
    end

end