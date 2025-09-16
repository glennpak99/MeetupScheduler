from flask import request,jsonify
from config import app, db
from models import Contact

#Create, Read, Update, Delete
@app.route("/contacts", methods =["GET"])
def get_contact():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})

@app.route("/create_contact", methods = ["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    nickname = request.json.get("nickname")
    monday = request.json.get("monday")

    if not first_name or not last_name or not nickname:
        return (
            jsonify({"message": "You must include at least first name, last name, or nickname"}), 400,
        )
    
    new_contact = Contact(first_name = first_name, last_name = last_name, nickname = nickname, monday = monday)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User Created"}), 201

@app.route("/update_contact/<int:user_id>", methods = ["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"User not found"}), 404
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.nickname = data.get("nickname", contact.nickname)
    contact.monday = data.get("monday", contact.monday)
    contact.tuesday = data.get("tuesday", contact.tuesday)
    contact.wednesday = data.get("wednesday", contact.wednesday)
    contact.thursday = data.get("thursday", contact.thursday)
    contact.friday = data.get("friday", contact.friday)
    contact.saturday = data.get("saturday", contact.saturday)
    contact.sunday = data.get("sunday", contact.sunday)

    db.session.commit()

    return jsonify({"message": "User updated."}), 200

@app.route("/delete_contact/<int:user_id>", methods = ["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"User not found"}), 404
    
    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "User Deleted"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        
    app.run(debug=True)

