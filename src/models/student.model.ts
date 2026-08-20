export class Student {
  public rollNumber: string;
  public email: string;
  public fullName: string;
  public phone: string;

  constructor(rollNumber: string, email: string, fullName: string, phone: string) {
    this.rollNumber = rollNumber;
    this.email = email;
    this.fullName = fullName;
    this.phone = phone;
  }
}
