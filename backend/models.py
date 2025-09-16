from config import db

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(80), unique = False, nullable = True)
    last_name = db.Column(db.String(80), unique = False, nullable = True)
    nickname = db.Column(db.String(120), unique = True, nullable = True)
    # monday = db.Column(db.String(120), unique = False, nullable = True)
    # tuesday = db.Column(db.String(120), unique = False, nullable = True)
    # wednesday = db.Column(db.String(120), unique = False, nullable = True)
    # thursday = db.Column(db.String(120), unique = False, nullable = True)
    # friday = db.Column(db.String(120), unique = False, nullable = True)
    # saturday = db.Column(db.String(120), unique = False, nullable = True)
    # sunday = db.Column(db.String(120), unique = False, nullable = True)
    availability = db.Column(db.JSON, nullable = False, default = dict)

    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "nickname": self.nickname,
            # "monday": self.monday,
            # "tuesday": self.tuesday,
            # "wednesday": self.wednesday,
            # "thursday": self.thursday,
            # "friday": self.friday,
            # "saturday": self.saturday,
            # "sunday": self.sunday
            "availability": self.availability
        }
