import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {

  email: string = ""
  constructor (private toast: ToastrService) { }

  ngOnInit(): void {

  }

  resetPass() {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(this.email)) {
      this.makeInTime("redirecionando para alterar a senha em 3", 1000);
      this.makeInTime("redirecionando para alterar a senha em 2", 2100);
      setTimeout(() => window.location.href = `https://batsworksimecard.onrender.com/batsworks/reset/${encodeURIComponent(this.email)}`, 3500)
    } else {
      this.toast.error("o email informado não é um tipo de email valido!")
    }
  }

  private makeInTime(message: string, time: number) {
    setTimeout(() => this.toast.success(message), time);
    setTimeout(() => this.toast.clear(), time + 900)
  }

}
