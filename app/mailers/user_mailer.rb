class UserMailer < ApplicationMailer

    def reset_password(user)
        @user = user
        mail(to: @user.email, subject: "Reset Your SimpleShelf Password")
    end
end