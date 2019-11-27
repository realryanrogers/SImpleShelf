class BooksController < ApplicationController

    def index
        @user = current_user
        @shelf = @user.shelves.where(name: params["shelf"]).first
        @books = @shelf.books
        render json: @books.to_json
    end

end