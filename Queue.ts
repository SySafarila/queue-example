interface Donation {
  currency: "IDR" | string;
  donator: string;
  amount: number;
  message: string;
  type: "basic" | "media-youtube" | "media-tiktok" | "media-reels";
}

class Queue {
  private isPlaying: boolean = false;
  private queue: Donation[] = [];

  constructor() {
    this.incomingDonate.bind(this); // set for callBack
  }

  private startQueue(): void {
    this.isPlaying = true;
    console.log(`Displaying donation from ${this.queue[0].donator}`);

    // display donation

    // delete displayed donation
    this.deleteQueue();

    // re-start queue until length of queue is 0 or empty
    if (this.queue.length >= 1) {
      this.startQueue();
    }
  }

  private addQueue(data: Donation): void {
    this.queue.push(data);
    if (!this.isPlaying) {
      this.startQueue();
    }
  }

  private deleteQueue(): void {
    if (this.queue.length > 0) {
      this.isPlaying = false;
      this.queue.splice(0, 1);
    }
  }

  public incomingDonate(e: { data: Donation[] }): void {
    const donations = e.data;

    donations.forEach((donation: Donation) => {
      this.addQueue(donation);
    });
  }
}
