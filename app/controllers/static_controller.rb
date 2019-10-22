class StaticController < ApplicationController
  def home
    puts "got home"
    render json: {status: "It's working"}
  end

end
