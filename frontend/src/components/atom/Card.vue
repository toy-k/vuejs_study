<template>
	<div>
  <b-card
    :title="post.title"
    :img-src="photo.url"
    :img-alt="photo.title"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
			{{post.body}}
		</b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
</div>
</template>

<script>

import priceFormat from '../../utils/priceFormat.js'

export default {
	name: 'Card',
	props: {
		msg: String,
		photo: Object,
		post: Object,
	},
	setup() { 
		return {priceFormat} //{{priceformnat.numberWithcommas(item.price)}}
	}
}
</script>