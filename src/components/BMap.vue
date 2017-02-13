<template lang="html">
  <div id="allmap" :style="mapStyle"></div>
</template>

<script>
  export default {
    props: {
      //地图高度
      mapHeight: {
        type: Number,
        default: 300
      },
      //地图经度
      lng: {
        type: Number,
        default: 116.331398
      },
      lat: {
        type: Number,
        default: 39.897445
      }
    },
    data() {
      return {
        mapStyle: {
          width: '100%',
          height: this.mapHeight + 'px'
        }
      }
    },
    ready() {
      this.getPosition()
    },
    methods: {
      getPosition() {
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398, 39.897445);
        map.centerAndZoom(point, 50);

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
          }
          else {
          }
        }, { enableHighAccuracy: true })
      }
    }
  }
</script>

<style lang="css">
</style>