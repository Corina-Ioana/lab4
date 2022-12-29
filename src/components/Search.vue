<template>
  <v-container>
    <v-flex>
      <!--<h1 class="headline text-xs-center grey--text text--lighten-3 mb-4 mt-2">iTunes Search</h1>-->
      <h1 class="text-center">Wellcome to Music</h1>

      <v-card>
        <v-card-text class="pb-0">
          <v-form @submit.prevent="submitSearch(true)">
            <v-layout row>
              <v-flex xs11>
                <v-text-field
                  v-model="search"
                  class="mt-0"
                  color="white"
                  dark
                  clearable
                  :label="label"
                  @keyup.enter="submitSearch()"
                  @click:append-inner="submitSearch()"
                  append-inner-icon="mdi-magnify"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
          <v-flex xs12>
            <v-radio-group v-model="entity" row dark>
              <v-radio label="Album" value="album"></v-radio>
              <v-radio label="Music Track" value="musicTrack"></v-radio>
            </v-radio-group>
          </v-flex>
        </v-card-text>

        <v-card-text v-if="albums.length">
          <v-layout row>
            <v-flex xs12 class="text-xs-center">
              <v-btn fab outline color="white" small @click="submitSearch()">
                <v-icon>chevron_left</v-icon>
                <text>descendent</text>
              </v-btn>
              <span class="title white--text mx-4">{{ page }}</span>
              <v-btn
                fab
                outline
                color="white"
                small
                @click="submitSearch(true)"
              >
                <v-icon>chevron_right</v-icon>
                <text>ascendent</text>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-center>
            <div
              class="text-xs-center my-1 mx-3 album-card"
              v-for="(album, index) in albums"
              :key="index"
            >
              <v-avatar
                :tile="true"
                size="160"
                class="elevation-6 album-box mt-3"
                @click="toiTunesAlbum(album)"
              >
                <img
                  :src="resizeArtworkUrl(album)"
                  alt="Album Cover"
                  class="album-cover"
                />
                <v-icon class="play-btn" color="black"
                  >play_circle_filled</v-icon
                >
              </v-avatar>
              <v-flex class="text-xs-left mt-2 album-info" xs12>
                <div
                  v-if="album.wrapperType === 'track'"
                  class="subheading font-weight-medium white--text"
                >
                  {{ album.trackName }}
                </div>
                <div
                  class="subheading font-weight-medium text--lighten-2 grey--text"
                >
                  {{ album.collectionName }}
                </div>
                <div class="text--lighten-2 grey--text">
                  {{ album.artistName }}
                </div>
                <div class="text--lighten-2 grey--text">
                  {{ getReleaseYear(album) }}
                </div>
                <div class="grey--text">{{ album.primaryGenreName }}</div>
              </v-flex>
            </div>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      albums: [],
      entity: "album",
      label: "Enter Artist Name",
      page: 0,
      search: "",
    };
  },

  watch: {
    search: function (val) {
      if (!val) {
        (this.albums = []), (this.page = 0);
      }
    },

    entity: function () {
      this.search = "";
      this.label =
        this.entity === "album" ? "Enter Artist Name" : "Enter Music Track";
    },
  },

  methods: {
    getReleaseYear(album) {
      return album.releaseDate.substr(0, 4);
    },

    resizeArtworkUrl(album) {
      return album.artworkUrl100.replace("100x100", "160x160");
    },

    submitSearch(increase) {
      if (!this.search) {
        return;
      }

      return axios
        .get(
          `https://itunes.apple.com/search?term=${this.search}&entity=${
            this.entity
          }&limit=200&offset=${this.page * 200}`
        )
        .then((response) => {
          if (increase) {
            this.page++;
          } else {
            this.page--;
          }
          this.albums = response.data.results.sort((a, b) =>
            a.releaseDate > b.releaseDate ? -1 : 1
          );
        });
    },

    toiTunesAlbum(album) {
      window.open(album.collectionViewUrl, "_blank");
    },
  },
};
</script>

<style scoped>
.album-box {
  position: relative;
  display: inline-block;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.album-box:hover {
  -webkit-transform: scale(1.12, 1.12);
  transform: scale(1.12, 1.12);
}

.album-card {
  width: 160px;
}

.album-card:hover {
  cursor: pointer;
}

.album-card:hover .play-btn {
  display: block;
}

.album-cover,
.album-cover img {
  border-radius: 2px !important;
}

.album-cover:active {
  animation: pop 0.3s linear 1;
}

@keyframes pop {
  50% {
    transform: scale(1.02);
  }
}

.album-info div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-card {
  background: #b3b7d0;
  height: 100%;
}

.v-card__title,
.v-card__text {
  background: #262b48;
}

.play-btn {
  padding-top: 50px;
  padding-right: 100px;
  position: absolute;
  right: 0px;
  top: 0;
  display: none;
  z-index: 9;
}

.v-input--radio-group .v-radio {
  margin-bottom: 8px;
  flex: 40px;
}

.mt-0 {
  width: 300px;
}
.nyt {
  font-family: "Bevan", cursive;
}
.text-xs-center {
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: "Courier New", Courier, monospace;
}
.text-center {
  font-family: "Courier New", Courier, monospace;
  font-size: 40px;
}
</style>
