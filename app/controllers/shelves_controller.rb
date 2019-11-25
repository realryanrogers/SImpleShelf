class ShelvesController < ApplicationController

    def index
        @user = current_user
        @shelves = @user.shelves
        render json: @shelves.to_json
    end

    def create
        @user = current_user
        if !Shelf.where(user_id: @user.id, name: params["name"]).empty?
            render json: {"status": "exists"}
        end
        @shelf = @user.shelves.create(params)
        if !@shelf.valid?
            render json: {"status": "error"}
        else
            render json: {"status": "created", "shelf": @shelf }
        end
    end

end