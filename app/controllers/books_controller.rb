class BooksController < ApplicationController
    PAGELIMIT = 20
    def index
        
        @user = current_user
        @shelf = @user.shelves.where(name: params["shelf"]).first
        @books = @shelf.books.order(updated_at: :desc).limit(PAGELIMIT).offset((params["page"].present? ? (params["page"].to_i - 1 ) * PAGELIMIT : 0))
        
        render json: {books: @books, pageNumber: (params["page"].present? ? params["page"].to_i : 1), totalCount: @shelf.books.count}
    end

    def create
        @user = current_user
        bookExists = Book.bookExistsOnShelf(@user, params["book_identifier"])
        puts "PARAMS!!"
        puts params
        if params["shelf"] == "Wishlist" && !bookExists.present?
            puts "WISHLIST OR BOOK EXISTS"
            book = Book.create!(name: params["name"], book_identifier: params["book_identifier"], shelf_id: @user.shelves.where(name: "Wishlist").first.id, user_id: @user.id)
            render json: book.to_json
        else 
            puts "NO BOOK EXISTS!"
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
            if params["rating"].present? && bookExists.present?
                puts "BOOKEXISTS.PRESENT"
                if bookExists.rating.present?
                    puts "BOOKEXISTS RATING.PRESENT"
                    createdata["rating"] = {}
                    createdata["rating"]["review"] = (params["rating"]["review"].present? ? params["rating"]["review"] : bookExists.rating["review"])
                    createdata["rating"]["value"] = (params["rating"]["value"].present? ? params["rating"]["value"] : bookExists.rating["value"])
                else
                    puts "!BOOKEXISTS.PRESENT"
                    createdata["rating"] = params["rating"]
                end
            else
                createdata["rating"] = params["rating"]
            end
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