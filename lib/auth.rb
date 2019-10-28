require 'jwt'

class Auth

  ALGORITHM = "HS256"

  def self.issue(payload)
    puts "HERE"
    puts payload
    JWT.encode(
      payload,
      auth_secret,
      ALGORITHM
    )
  end

  def self.decode(token)
    decoded_t = JWT.decode(
      token,
      auth_secret,
      true,
      { algorithm: ALGORITHM }
    ).first
    puts "Decoded = " + decoded_t["user"]
    return decoded_t
  end

  def self.auth_secret
    "1e3ff42f68a495fbf2b1df01c4c874bc2b3a581489f015ef763e8d0169ee002e5540f7fd62ae8f778539fb9107da0bf4881ea46830615ec81356b36ab398d178"
  end

end
