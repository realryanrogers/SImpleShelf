class Rating < ApplicationRecord
  belongs_to :user



  def self.newRating(user, params)
    params["user_id"] = user.id
    rating = Rating.create(params)

  end

  def self.getDetails(book_id, user_id)
    ratings = Rating.where(google_id: book_id)
    response = {}
    response["total"] = Rating.where(google_id: book_id).count
    response["text"] = Rating.joins(:user).where(google_id: book_id).where.not(review: nil).order(created_at: :desc).limit(20).pluck(:firstname, :review).to_h
    response["likes"] = Rating.where(google_id: book_id).where(value: 5).count
    response["dislikes"] = Rating.where(google_id: book_id).where(value: 1).count
    response["selfReview"] = ratings.where(user_id: user_id)
    return response


  end

  def self.handleRating(user, params)
    puts "Params"
    puts params
    if params["google_id"].present?
      puts "rating present"
      rating = user.ratings.find_by(google_id: params["google_id"])
      puts "RATING"
      puts rating.present?
    else

      return {"status": "error"}
    end

    if rating.present?
      "updating rating"
      return rating.update(params)
    else
      puts "creating rating"
      params["user_id"] = user.id
      res = Rating.create(params)
      puts "RES"
      puts res.id
    end

  end
end
