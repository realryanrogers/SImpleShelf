class Rating < ApplicationRecord
  belongs_to :user



  def self.newRating(user, params)
    params["user_id"] = user.id
    rating = Rating.create(params)

  end

  def self.handleRating(user, params)
    params["user_id"] = user.id
    if params["type_id"].present?
      puts "rating present"
      rating = user.ratings.find_by(type_id: params["type_id"])
    else

      return {"status": "error"}
    end

    if rating.present?
      "updating rating"
      return rating.update(params)
    else
      "creating rating"
      return Rating.create(params)
    end

  end
end
