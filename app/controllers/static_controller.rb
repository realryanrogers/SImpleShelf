class StaticController < ApplicationController
  def home
    puts "got home"
    render json: {status: "It's working"}
  end

  def booksearch
    search_return = BookSearch.search(search_params[:term])
    render json: search_return
  end


  private
    def search_params
      params.permit(:term)
    end
end
