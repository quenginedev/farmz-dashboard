<template>
    <v-card flat>
        <v-card-title class="">
            <div style="width: 420px;">
                COLLABORATION AGREEMENT BETWEEN
                <p class="font-weight-bold text-h5 ma-0">TASTE COCOA GHANA LIMITED <span class="headline">AND</span>
                </p>
                <p class="font-weight-bold text-h5 ma-0">COCOA FARMERS</p>
            </div>
            <v-spacer/>
            <v-card width="180" height="180" color="grey">
                <v-img :src="farmer.picture"/>
            </v-card>
        </v-card-title>
        <v-card-text class="mt-10">
            <p>
                This AGREEMENT is made on the day and year
                <span class="font-weight-bold body-1">{{
                        dayjs(farmer.created_at || Date.now()).format('DD/MM/YYYY')
                    }}</span>
                between Taste Cocoa Ghana Limited with its registered address of
                Second Martey Tsuru Link No. 17, East Airport, Accra, P.O. BOX AH 222 Achimota Accra, Ghana
                (hereinafter referred to as “<span class="font-weight-bold">THE COMPANY</span>”).
            </p>
            <p>
                    <span class="font-weight-bold">
                       {{farmer.full_name}}
                    </span>, A small scale, medium to large cocoa plantation farmer who earns their living from growing
                and
                selling cocoa beans and most recently cocoa pulp juice (hereinafter referred to as “<span
                class="font-weight-bold">THE COCOA
                    FARMER</span>”)
            </p>
            <p>both together referred to as “<span class="font-weight-bold">the PARTIES</span>”</p>


            <h3 class="mt-10 mb-5">NOW THEREFORE the Parties hereto hereby agree as follows:</h3>
            <ol type="A">
                <li class="pl-5 ml-5">
                    The Company sources the farmer’s fresh cocoa beans and purchases all buckets that meet all in
                    bound check speci-
                    fications per agreed quantity and quality standards in accordancewith the Company’s policy.
                    Where buckets are
                    deemed to be rejected will not be paid for as per this agreement.
                </li>
                <li class="pl-5 ml-5 mt-1">
                    Both parties agreed to establish the minimum guaranteed price to be paid for each bucket. For
                    the season 2019/
                    2020, the purchase price is GHS 8.0 per bucket of a volume of 16L which may be subject to change
                    when the need
                    arises.
                </li>
                <li class="pl-5 ml-5 mt-1">
                    The Company will make payment through its registered mobile money channel, where there is a
                    network challenge
                    the farmer will be paid cash.
                </li>
                <li class="pl-5 ml-5 mt-1">
                    The cocoa farmer agrees to bring the buckets of cocoa beans with the bean taxi riders to
                    pressing site before 3pm
                    on production days, if not instructed differently by the Company.
                </li>
                <li class="pl-5 ml-5 mt-1">
                    The cocoa farmer is expected to do harvesting of the cocoa beans at most one day before breaking
                    it.
                </li>
                <li class="pl-5 ml-5 mt-1">
                    The cocoa farmer will have to go through a mandatory training and assessment and strict
                    adherence to hygiene and
                    sustainable agricultural practices.
                </li>
            </ol>
            <h3 class="mt-10 mb-5">Duration of Agreement</h3>
            <ol type="A">
                <li class="pl-5 ml-5 mt-1">
                    This agreement is subject to performance review by both parties.
                </li>
                <li class="pl-5 ml-5 mt-1">
                    The Company or the cocoa farmer will have to give notice in writing/phone call one-month (30 days’)
                    notice before
                    terminating the agreement.
                </li>
            </ol>

            <v-row class="mt-10">
                <v-col cols="6">
                    <h3>THE COMPANY</h3>
                </v-col>
                <v-col cols="6">
                    <h3>THE COCOA FARMER</h3>
                </v-col>
            </v-row>
            <v-row class="mb-10">
                <v-col cols="6">
                    <p class="">TASTE COCOA GHANA LIMITED</p>
                    <p class="">P.O.Box AH 222 Achimota Accra</p>
                    <p class="">Phone Number: 0201833494</p>
                </v-col>
                <v-col>
                    <p class="text-uppercase">Name: {{ farmer.full_name }}</p>
                    <p class="text-uppercase">Gender: {{ farmer.gender}}</p>
                    <p class="text-uppercase">Phone Number: {{ farmer.phone }}</p>
                    <p class="text-uppercase">Farmer ID: {{farmer.farmer_id}}</p>
                    <p class="text-uppercase">Farmer Community: {{farmer.community}}</p>
                    <p class="text-uppercase">Farmer Region: {{farmer.region.region}}</p>
                </v-col>
            </v-row>
            <v-row class="mt-10">
                <v-col cols="6" class="">
                    <v-divider/>
                    <p class="font-weight-bold">Signature</p>
                </v-col>
                <v-col cols="6">
                    <v-divider/>
                    <p class="font-weight-bold">Signature/ Finger Print</p>
                </v-col>
            </v-row>
            <p class="mt-10 font-weight-bold">TASTE COCOA GHANA LIMITED FARMERS COLLABORATION AGREEMENT</p>
        </v-card-text>
    </v-card>
</template>

<script>
import dayjs from 'dayjs'

export default {
    name: 'AgreementContent',
    props: {
        farmer: Object
    },
    data() {
        return {
            dayjs
        }
    }
}
</script>

<style scoped>

</style>
