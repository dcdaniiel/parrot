const { PersistedEntity } = require('../base');

class Person extends PersistedEntity {
  static getEntityClass() {
    return Person;
  }

  static serialize(obj) {
    return {
      id: obj._id,
      user_id: obj._user_id,
      level_id: obj._level_id,
      created_at: obj._created_at,
      updated_at: obj._updated_at,
      last_vacation: obj._last_vacation,
      last_promotion: obj._last_promotion,
      birthdate: obj._birthdate,
      start_work: obj._start_work,
      end_work: obj._end_work,
      name: obj._name,
      age: obj._age,
      phone: obj._phone,
      emergency_contact: obj._emergency_contact,
      ahead_card: obj._ahead_card,
      current_project: obj._current_project,
      person_email: obj._person_email,
      fdte_email: obj._fdte_email,
      bitbucket_account: obj._bitbucket_account,
      kids: obj._kids,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const person = new Person(
        serialized.user_id,
        serialized.level_id,
        serialized.name,
        serialized.birthdate,
        serialized.age
      );

      person._id = serialized.id;
      person._created_at = serialized.created_at;
      person._updated_at = serialized.updated_at;
      person._last_vacation = serialized.last_vacation;
      person._last_promotion = serialized.last_promotion;
      person._start_work = serialized.start_work;
      person._end_work = serialized.end_work;
      person._phone = serialized.phone;
      person._emergency_contact = serialized.emergency_contact;
      person._ahead_card = serialized.ahead_card;
      person._current_project = serialized.current_project;
      person._person_email = serialized.person_email;
      person._fdte_email = serialized.fdte_email;
      person._bitbucket_account = serialized.bitbucket_account;
      person._kids = serialized.kids;

      return person;
    }

    return undefined;
  }

  constructor(user_id, level_id, name, birthdate, age) {
    super();

    this._name = name;
    this._user_id = user_id;
    this._level_id = level_id;
    this._birthdate = birthdate;
    this._age = age;
  }

  set name(val) {
    this._name = val;
  }
  set birthdate(val) {
    this._birthdate = val;
  }
  set age(val) {
    this._age = val;
  }
  set user_id(val) {
    this._user_id = val;
  }
  set level_id(val) {
    this._level_id = val;
  }
  set last_vacation(val) {
    this._last_vacation = val;
  }
  set last_promotion(val) {
    this._last_promotion = val;
  }
  set phone(val) {
    this._phone = val;
  }
  set ahead_card(val) {
    this._ahead_card = val;
  }
  set start_work(val) {
    this._start_work = val;
  }
  set end_work(val) {
    this._end_work = val;
  }
  set current_project(val) {
    this._current_project = val;
  }
  set person_email(val) {
    this._person_email = val;
  }
  set fdte_email(val) {
    this._fdte_email = val;
  }
  set bitbucket_account(val) {
    this._bitbucket_account = val;
  }
  set emergency_contact(val) {
    this._emergency_contact = val;
  }
  set kids(val) {
    this._kids = val;
  }

  get user_id() {
    return this._user_id;
  }
  get level_id() {
    return this._level_id;
  }
  get last_vacation() {
    return this._last_vacation;
  }
  get last_promotion() {
    return this._last_promotion;
  }
  get phone() {
    return this._phone;
  }
  get ahead_card() {
    return this._ahead_card;
  }
  get start_work() {
    return this._start_work;
  }
  get end_work() {
    return this._end_work;
  }
  get current_project() {
    return this._current_project;
  }
  get person_email() {
    return this._person_email;
  }
  get fdte_email() {
    return this._fdte_email;
  }
  get bitbucket_account() {
    return this._bitbucket_account;
  }
  get emergency_contact() {
    return this._emergency_contact;
  }
  get kids() {
    return this._kids;
  }
}

module.exports = { Person };
