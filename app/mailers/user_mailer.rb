
class UserMailer < ApplicationMailer



    def reset_password(user)
        @user = user
        SendGridMailer.send(@user, "d-1cffdcf5eab245ef9a008f50ff7186ce")

    end
end