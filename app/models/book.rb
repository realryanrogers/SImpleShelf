class Book < ApplicationRecord

    belongs_to :shelf

    def self.bookExistsOnShelf(user, book_identifier)
        book = Book.find_by(book_identifier: book_identifier, user_id: user.id)
        return book
    end

    def self.getDetails(book_id, user_id)
        ratings = Book.where(book_identifier: book_id)
        response = {}
        response["total"] = ratings.count
        response["likes"] = ratings.where("rating->>'value' = ?", "5").count
        response["dislikes"] = ratings.where("rating->>'value' = ?", "1").count
        response["selfReview"] = ratings.where(user_id: user_id)
        return response

    end

end
