<template>
    <div class="q-ma-md row">
            <div    class="doc col-3 col-md-2 col-lg-2 col-xl-1 column no-wrap items-center text-center rounded-borders q-pa-md q-ma-md"
                    style="border: 3px solid #f1f1f1;"
                    v-for="(b, i) in docs" :key="i"
                    >
                <img class="col-19" :src="loadImg(docs[i].format)" />
                <div class="col-2 text-grey-7 text-caption OpenSansBold ellipsis-2-lines">
                    {{ docs[i].name }}
                </div>
            </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            im : require('@/assets/proficon/docdoc.png'),
            docs: {
                0: { name: 'passport.pdf', format: 'pdf'},
                1: { name: 'inn.pdf', format: 'pdf'},
                2: { name: 'cantract.doc', format: 'doc'},
                3: { name: 'New Document.doc', format: 'doc'},
                4: { name: 'passport-scanawda-awadaw-daw-wdawdawd.jpg', format: 'jpg'}
            }
        }
    },
    methods: {
        loadImg(f) {
            return require('@/assets/proficon/doc'+f+'.png');
        }
    }
}
</script>
<style scoped>
@font-face {
    font-family: 'Avant';
    src: url('~assets/fonts/avant.ttf') format('truetype');
}
@font-face {
    font-family: 'OpenSansBold';
    src: url('~assets/fonts/OpenSans-Bold.ttf') format('truetype');
}
.OpenSansBold {
    font-family: 'OpenSansBold';
    font-weight: 500;
}
.Avant {
    font-family: 'Avant';
}
.doc {
    cursor: pointer;
}
.doc:hover {
    border-color: #255fff;
}
</style>
