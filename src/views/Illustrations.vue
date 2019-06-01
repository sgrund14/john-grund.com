<template>
    <Responsive :breakpoints="{
        mobile: el => el.width <= 900 - 64
    }">
        <section v-if="isContentLoaded">
            <!-- <ImageModal
                :image="selectedImage"
                :isOpen="!!selectedImage"
            /> -->
            <div
                v-for="(illustrationCol, index) in illustrations"
                :key="`illustration-${index}`"
                :id="`illustration-${index}`"
                class="illustration-column"
            >
                <div
                    v-for="illustration in illustrationCol"
                    :key="illustration.title"
                    class="wrapper"
                    @mouseenter="() => toggleDetails(illustration, illustration.index)"
                    @mouseleave="() => toggleDetails(illustration, -1)" 
                >
                    <img
                        v-lazy="illustration.src"
                        :alt="illustration.alt"
                    >
                </div>
            </div>
            <div :class="['detailsWrapper', 'leftDetails', { showDetails: illustrationToShow.index % 3 === 0 }]">
                <div class="illustrationDetails">
                    <h3>{{illustrationToShow.left.title}}</h3>
                    <p>{{illustrationToShow.left.details}}</p>
                </div>
            </div>
            <div :class="['detailsWrapper', 'centerDetails', { showDetailsCenter: illustrationToShow.index % 3 === 1 }]">
                <div class="illustrationDetails">
                    <h3>{{illustrationToShow.center.title}}</h3>
                    <p>{{illustrationToShow.center.details}}</p>
                </div>
            </div>
            <div :class="['detailsWrapper', 'rightDetails', { showDetails: illustrationToShow.index % 3 === 2 }]">
                <div class="illustrationDetails">
                    <h3>{{illustrationToShow.right.title}}</h3>
                    <p>{{illustrationToShow.right.details}}</p>
                </div>
            </div>
        </section>
    </Responsive>
</template>

<script>
import Loading from '../components/Loading';
import store, { mixin } from '../stores';
import { Responsive } from 'vue-responsive-components'

export default {
    name: 'Illustrations',
    mixins: [mixin],
    components: {
        Loading,
        Responsive
    },
    beforeRouteEnter (to, from, next) {
        if (!from.name) {
            next();
        } else {
            store.dispatch('fetchPage', '/illustrations').then(next)
        }
    },
    mounted() {
        if (!this.contentLoaded) {
            this.$store.dispatch('fetchPage', '/illustrations');
        }
    },
    data() {
        return {  
            illustrationToShow: {
                index: -1,
                left: {},
                center: {},
                right: {}
            }
        };
    },
    computed: {
        illustrations() {
            const illustrations = this.page.illustrations.reduce((acc, illustration, index) => {
                const bucketIndex = index % 3;
                const bucket = acc[bucketIndex];
                acc[bucketIndex] = [...bucket, {
                    ...illustration,
                    index: bucketIndex,
                    src: illustration.image.url,
                }];
                return acc;
            }, [[],[], []]);
            return illustrations;
        },
        isContentLoaded() {
            return !!this.page;
        },
        hoveredIllustration() {
            return this.illustrationToShow
        }
    },
    methods: {
        toggleDetails(illustration, index) {
            if (index === -1) {
                this.illustrationToShow.index = index;
                return;
            }
            this.illustrationToShow = { ...this.illustrationToShow, [this.mapIndexToColumn(index)]: illustration, index };
        },
        mapIndexToColumn(index) {
            switch(index) {
                case 0:
                    return "left";
                case 1:
                    return "center";
                case 2:
                    return "right";
            }
        }
    }
}
</script>

<style scoped>
section {
   display: flex;
   justify-content: space-between;
   position: relative;
}
.illustration-column {
    width: calc(100vw/3 - 2rem);
}
/* .illustration-column:first-child > .wrapper {
    padding-right: .5rem;
}
.illustration-column:nth-child(2) > .wrapper {
    padding-left: .5rem;
    padding-right: .5rem;
}
.illustration-column:nth-child(3) > .wrapper {
    padding-left: .5rem;
} */

img:hover {
    cursor: zoom-in;
}
img {
    height: 100%;
    width: 100%;
    -webkit-animation: slideIn .5s;
  -moz-animation: slideIn .5s;
  -ms-animation: slideIn .5s;
  -o-animation: slideIn .5s;
  animation: slideIn .5s;
}
img[lazy="loading"] {
    background-color: var(--lightgrey);
}
.wrapper {
    position: relative;
    transition: .3s margin-bottom ease;
    width: 100%;
    padding-bottom: 1rem;
}
.detailsWrapper {
    position: fixed;
    bottom: 1rem;
    width: calc((100vw / 3) - 2rem);
    transition: 0.3s transform ease, 0.3s opacity ease;
    display: flex;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
}
.illustrationDetails {
    width: 90%;
    display: flex;
    flex-direction: column;
    background-color: white;
    color: black;
    border-radius: .5rem;
    border: 3px outset silver;
    padding: 1rem 2rem;
    line-height:1.25rem;
}
.leftDetails {
    text-align: left;
    left: 2rem;
    transform: translateX(calc(-100% - 2rem));
}
.rightDetails {
    text-align: right;
    right: 2rem;
    transform:  translateX(calc(100% + 2rem));
}
.centerDetails {
    text-align: center;
    left: 50%;
    transform: translateX(-50%) translateY(calc(100% + 1rem + 1px));
}
.illustrationDetails > h3 {
    margin-bottom: .5rem;
    font-size: .75rem;
    text-transform: uppercase;
}
.illustrationDetails > p {
      font-family: var(--ff-serif);
      font-size: 1rem;
      font-style: italic;
  }
.showDetails {
    opacity: 1;
    transform: translateX(0) translateY(0);
}
.showDetailsCenter {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}
@media (max-width: 900px) {
  section {
    -webkit-column-count: 2;
   -moz-column-count: 2;
   column-count: 2;
  }
  .details > h3 {
      font-size: 1rem;
  }
  .details > p {
      font-size: 1rem;
  }
}

</style>
