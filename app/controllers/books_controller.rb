class BooksController < ApplicationController

    def index
        @user = current_user
        @shelf = @user.shelves.where(name: params["shelf"]).first
        @books = @shelf.books
        render json: @books.to_json
    end

    def create
        @user = current_user
        bookExists = Book.bookExistsOnShelf(@user, params["book_identifier"])
        if params["shelf"] == "wishlist" && !bookExists.present?
            book = Book.create!(name: params["name"], book_identifier: params["book_identifier"], shelf_id: @user.shelves.where(name: "Wishlist").first.id, user_id: @user.id)
            render json: book.to_json
        else 
            @shelf = @user.shelves.where(name: params["shelf"]).first
            if !@shelf.present?
                render json: {error: "no shelf"}
            end
            createdata = {}
            createdata["user_id"] = @user.id
            createdata["shelf_id"] = @shelf.id
            params["name"].present? ? (createdata["name"] = params["name"]) : nil
            params["book_identifier"].present? ? (createdata["book_identifier"] = params["book_identifier"]) : nil
            params["isbn"].present? ? (createdata["isbn"] = params["isbn"]) : nil
            params["rating"].present? ? (createdata["rating"] = params["rating"]) : nil
            if bookExists.present?
                book = bookExists.update(createdata)
            else
                book = Book.create!(createdata)
            end
            render json: book
        end
    end

    def bookDetails
        ratings = Book.getDetails(params["book_id"], current_user.id)
        render json: ratings.to_json
    end

end