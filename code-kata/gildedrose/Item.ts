export class Item {
	name: string;
	sellIn: number;
	quality: number;
	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
	passOneDay(): void {
		this.updateSellInDays();
		this.updateQuality();
		if (this.isExpired()) {
			this.updateQualityAfterExpiration();
		}
	}
	static createAgedBrie(sellIn: number, quality: number): Item {
		return new Item('Aged Brie', sellIn, quality);
	}
	static createItem(name: string, sellIn: number, quality: number): Item {
		return new Item(name, sellIn, quality);
	}

	static createSulfuras(sellIn: number, quality): Item {
		return new Item('Sulfuras, Hand of Ragnaros', sellIn, quality);
	}

	static createBackStagePass(sellIn: number, quality: number): Item {
		return new Item(
			'Backstage passes to a TAFKAL80ETC concert',
			sellIn,
			quality
		);
	}

	isBackstagePass(): boolean {
		return this.name == 'Backstage passes to a TAFKAL80ETC concert';
	}
	isSulfuras(): boolean {
		return this.name == 'Sulfuras, Hand of Ragnaros';
	}
	isAgedBrie(): boolean {
		return this.name == 'Aged Brie';
	}

	private updateQuality() {
		if (this.isAgedBrie()) {
			if (this.quality < 50) {
				this.incrementQuality();
			}
			return;
		}
		if (this.isBackstagePass()) {
			if (this.quality < 50) {
				this.incrementQuality();
				if (this.sellIn < 10) {
					if (this.quality < 50) {
						this.incrementQuality();
					}
				}
				if (this.sellIn < 5) {
					if (this.quality < 50) {
						this.incrementQuality();
					}
				}
			}
			return;
		}
		if (this.quality <= 0) {
			return;
		}

		if (!this.isSulfuras()) {
			this.decrementQuality();
		}
	}

	private updateQualityAfterExpiration() {
		if (this.isAgedBrie) {
			if (this.quality < 50) {
				this.incrementQuality();
			}
			return;
		}
		if (this.isBackstagePass()) {
			this.quality = 0;
			return;
		}

		if (this.quality <= 0) {
			return;
		}
		if (this.isSulfuras()) {
			return;
		}
		this.decrementQuality();
	}

	private incrementQuality() {
		this.quality = this.quality + 1;
	}

	private decrementQuality() {
		this.quality = this.quality - 1;
	}

	private isExpired() {
		return this.sellIn < 0;
	}

	protected updateSellInDays() {
		if (this.isSulfuras()) {
			return;
		}
		this.sellIn = this.sellIn - 1;
	}
}
