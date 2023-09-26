export const Footer = (props: { title: string }) => {
    return (
        <footer class="fa-stack-1x">
            <div class="fa fa-2x">
                <a style="margin: 0 10px;" href="https://github.com/danny-yamamoto" target="_blank"><i class="fab fa-github fa-inverse"></i></a>
                <a href="https://twitter.com/dai_s_a_n" target="_blank"><i class="fab fa-twitter fa-inverse"></i></a>
            </div>
            <hr></hr>
            <p class="fa fa-xs">&copy; 2023 {props.title}. All rights reserved.</p>
        </footer>
    )
  }
  